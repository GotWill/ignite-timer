import { useContext } from 'react'
import { TaskInput } from '../../components/NewCycleForm/styles'
import { CycleContext } from '../../contexts/CycleContext'
import * as C from './styles'
import {formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'


export function History() {
    const { cycles } = useContext(CycleContext)
    return (
        <C.Container>
            <h1>Meu histórico</h1>

            <C.ContainerList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>
                                        {cycle.task}
                                    </td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(new Date(cycle.startDate), {addSuffix: true, locale: ptBR})}</td>
                                    <td>
                                       {cycle.finishDate &&  <C.Status statusColor='green'>Concluido</C.Status>}
                                       {cycle.interruptDate &&  <C.Status statusColor='red'>Interrompido</C.Status>}
                                       {!cycle.finishDate && !cycle.interruptDate &&  <C.Status statusColor='yellow'>Em andamento</C.Status>}

                                    </td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </C.ContainerList>
        </C.Container>
    )

}