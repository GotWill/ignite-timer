import { useEffect, useState } from 'react'
import * as C from './styles'
import { useContext } from 'react';
import { CycleContext } from '../../contexts/CycleContext';
import { differenceInSeconds } from 'date-fns'



export function CountDown() {

    const {isActiveCycle,activeCyclesId,markCurrentCycleAsFinished,amountSeconds,setSecondsPassed} = useContext(CycleContext)


    const totalSeconds = isActiveCycle ? isActiveCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;

        if (isActiveCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(), 
                  new Date(isActiveCycle.startDate)
                )

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsPassed(secondsDifference)
                }


            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [isActiveCycle, totalSeconds, activeCyclesId])


    const currentSeconds = isActiveCycle ? totalSeconds - amountSeconds : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (isActiveCycle) {
            document.title = `${minutes}: ${seconds}`
        }

        if(!activeCyclesId){
            document.title = "Ignite Timer";
        }
    }, [minutes, seconds])

    return (
        <C.CountDown>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <C.Separetor>:</C.Separetor>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </C.CountDown>

    )
}