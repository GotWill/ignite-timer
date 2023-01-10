import * as C from './styles'
import { useForm, useFormContext } from 'react-hook-form'
import { CycleContext } from '../../contexts/CycleContext';
import { useContext } from 'react'


export function NewCycleForm(){
    const { isActiveCycle } = useContext(CycleContext)
    const {register} = useFormContext()


   

    return (
        <C.FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <C.TaskInput
            id="task"
            placeholder='De um nome para o seu projeto.'
            list="task-suggestions"
            {...register("task")}
            disabled={!!isActiveCycle}
        />

        <datalist id='task-suggestions'>
            <option value="Projeto 1"></option>
        </datalist>

        <label htmlFor="minutes">Durante</label>
        <C.MinutesAmountInput
            type="number"
            id="minutes"
            placeholder='00'
            step={5}
            min={5}
            max={60}
            disabled={!!isActiveCycle}

            {...register("minutesAmount", { valueAsNumber: true })}
        />

        <span>minutos</span>
    </C.FormContainer>
    )
}