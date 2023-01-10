import { HandPalm, Play } from 'phosphor-react'
import * as C from './styles'
import * as zod from 'zod'
import { useContext } from 'react'
import { NewCycleForm } from '../../components/NewCycleForm'
import { CountDown } from '../../components/CountDown'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { CycleContext } from '../../contexts/CycleContext';

export function Home() {

    const {handleStopTimer,createNewCycle,isActiveCycle} = useContext(CycleContext)
  
    const Schema = zod.object({
        task: zod.string().min(1, 'Infrome a tarefa'),
        minutesAmount: zod.number().min(1).max(60, 'O intervalo precisa ser de no máximo 60 minutos')
    })

    type InputProps = zod.infer<typeof Schema>

    const newCycleForm = useForm<InputProps>({
        resolver: zodResolver(Schema),
        defaultValues: {
            task: '',
            minutesAmount: 0

        }
    })

    function handleCreateNewCycle(data:InputProps ){
        createNewCycle(data)
        reset()
    }

    const { handleSubmit, watch, reset } = newCycleForm


    const task = watch('task')

    return (
        <C.Container>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                  <FormProvider {...newCycleForm}>
                     <NewCycleForm />
                  </FormProvider>
                    <CountDown/>
                


                {isActiveCycle ? (
                    <C.StopButton onClick={handleStopTimer} type="button">
                        <HandPalm />
                        Stop
                    </C.StopButton>

                ) : (
                    <C.ButtonStart disabled={!task} type="submit">
                        <Play />
                        Começar
                    </C.ButtonStart>
                )

                }

            </form>
        </C.Container >
    )
}