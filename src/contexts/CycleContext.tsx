import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCyclesAsFinished } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface InputProps {
    task: string;
    minutesAmount: number;
}



interface CycleContextType {
    cycles: Cycle[]
    isActiveCycle: Cycle | undefined;
    activeCyclesId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSeconds: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: InputProps) => void;
    handleStopTimer: () => void
}


export const CycleContext = createContext({} as CycleContextType)

type ChildrenTypeProps = {
    children: ReactNode
}



export function CycleContextProvider({ children }: ChildrenTypeProps) {



    const [cyclesState, dispatch] = useReducer(cyclesReducer,
        {
            cycles: [],
            activeCyclesId: null,
        }, () => {
            const storageStateJSON = localStorage.getItem('@ignite-timer:cycles-state')

            if (storageStateJSON) {
                return JSON.parse(storageStateJSON)
            }
        }
    )

    const { cycles, activeCyclesId } = cyclesState
    const isActiveCycle = cycles.find((cycle) => cycle.id === activeCyclesId)


    const [amountSeconds, setAmountSeconds] = useState(() => {
       if(isActiveCycle){
        return  differenceInSeconds( new Date(),new Date(isActiveCycle.startDate)
        )
       }

        return 0
    })



    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state', stateJSON)
    }, [cyclesState])


    function setSecondsPassed(seconds: number) {
        setAmountSeconds(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCyclesAsFinished())
    }

    function createNewCycle(data: InputProps) {

        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))

        setAmountSeconds(0)
    }

    function handleStopTimer() {

        dispatch(interruptCurrentCycleAction())

    }
    return (
        <CycleContext.Provider
            value={{
                isActiveCycle,
                activeCyclesId,
                amountSeconds,
                cycles,
                markCurrentCycleAsFinished,
                setSecondsPassed,
                createNewCycle,
                handleStopTimer
            }}>
            {children}
        </CycleContext.Provider>
    )

}