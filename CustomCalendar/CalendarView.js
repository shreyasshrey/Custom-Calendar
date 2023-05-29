import { useState } from 'react'

const daysShortArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const monthNamesArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const CalendarView = () => {
    const today = new Date()

    // const getFormattedNumber = (value) => {
    //     return value.toLocaleString().length === 1 ? '0' + value : value
    // }

    const todayFormatted = `${
        today.getMonth() + 1
        // today.getDate()
        // getFormattedNumber(today.getDate())
        // today.getDate().toLocaleString().length === 1
        //     ? '0' + today.getDate()
        //     : today.getDate()
    }-${
        today.getDate()
        // today.getMonth() + 1
        // getFormattedNumber(today.getMonth() + 1)
        // today.getMonth().toLocaleString().length === 1
        //     ? '0' + (today.getMonth() + 1)
        //     : today.getMonth() + 1
    }-${today.getFullYear()}`
    const daysInWeek = [1, 2, 3, 4, 5, 6, 0]
    const [selectedDate, setSelectedDate] = useState(today)
    const currentMonthLastDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0,
    )
    const prevMonthLastDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        0,
    )
    const daysInCurrentMonth = currentMonthLastDate.getDate()
    const firstDayInMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1,
    ).getDay()
    const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1
    let prevMonthStartingPoint =
        prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1
    let currentMonthCounter = 1
    let nextMonthCounter = 1
    const rows = 6
    const cols = 7
    const calendarRows = {}

    for (let i = 1; i < rows + 1; i++) {
        for (let j = 1; j < cols + 1; j++) {
            if (!calendarRows[i]) {
                calendarRows[i] = []
            }

            if (i === 1) {
                if (j < startingPoint) {
                    calendarRows[i] = [
                        ...calendarRows[i],
                        {
                            classes: 'calendar-tile in-prev-month ',
                            date: `${
                                selectedDate.getMonth() === 0
                                    ? 12
                                    : selectedDate.getMonth()
                                // getFormattedNumber(prevMonthStartingPoint)
                                // prevMonthStartingPoint
                            }-${
                                prevMonthStartingPoint
                                // selectedDate.getMonth() === 0
                                //     ? 12
                                //     : selectedDate.getMonth()
                                // getFormattedNumber(
                                //     selectedDate.getMonth() === 0
                                //         ? 12
                                //         : selectedDate.getMonth(),
                                // )
                            }-${
                                selectedDate.getMonth() === 0
                                    ? selectedDate.getFullYear() - 1
                                    : selectedDate.getFullYear()
                            }`,
                            value: prevMonthStartingPoint,
                        },
                    ]
                    prevMonthStartingPoint++
                } else {
                    calendarRows[i] = [
                        ...calendarRows[i],
                        {
                            classes: 'calendar-tile ',
                            date: `${
                                selectedDate.getMonth() + 1
                                // currentMonthCounter
                                // getFormattedNumber(currentMonthCounter)
                                // currentMonthCounter.toLocaleString().length === 1
                                //   ? "0" + currentMonthCounter
                                //   : currentMonthCounter
                            }-${
                                currentMonthCounter
                                // selectedDate.getMonth() + 1
                                // getFormattedNumber(selectedDate.getMonth() + 1)
                                // selectedDate.getMonth().toLocaleString().length === 1
                                //   ? "0" + (selectedDate.getMonth() + 1)
                                //   : selectedDate.getMonth() + 1
                            }-${selectedDate.getFullYear()}`,
                            value: currentMonthCounter,
                        },
                    ]
                    currentMonthCounter++
                }
            } else if (i > 1 && currentMonthCounter < daysInCurrentMonth + 1) {
                calendarRows[i] = [
                    ...calendarRows[i],
                    {
                        classes: 'calendar-tile ',
                        date: `${
                            selectedDate.getMonth() + 1
                            // currentMonthCounter
                            // getFormattedNumber(currentMonthCounter)
                            //   currentMonthCounter.toLocaleString().length === 1
                            //     ? "0" + currentMonthCounter
                            //     : currentMonthCounter
                        }-${
                            currentMonthCounter
                            //   selectedDate.getMonth().toLocaleString().length === 1
                            //     ? "0" + (selectedDate.getMonth() + 1)
                            //     : selectedDate.getMonth() + 1
                            // selectedDate.getMonth() + 1
                            // getFormattedNumber(selectedDate.getMonth() + 1)
                        }-${selectedDate.getFullYear()}`,
                        value: currentMonthCounter,
                    },
                ]
                currentMonthCounter++
            } else {
                calendarRows[i] = [
                    ...calendarRows[i],
                    {
                        classes: 'calendar-tile in-next-month ',
                        date: `${
                            // getFormattedNumber(nextMonthCounter)
                            // nextMonthCounter
                            selectedDate.getMonth() + 2 === 13
                                ? 1
                                : selectedDate.getMonth() + 2
                        }-${
                            nextMonthCounter
                            // getFormattedNumber(
                            //     selectedDate.getMonth() + 2 === 13
                            //         ? 1
                            //         : selectedDate.getMonth() + 2,
                            // )
                            // selectedDate.getMonth() + 2 === 13
                            //     ? 1
                            //     : selectedDate.getMonth() + 2
                        }-${
                            selectedDate.getMonth() + 2 === 13
                                ? selectedDate.getFullYear() + 1
                                : selectedDate.getFullYear()
                        }`,
                        value: nextMonthCounter,
                    },
                ]
                nextMonthCounter++
            }
        }
    }

    const getPrevMonth = () => {
        setSelectedDate(
            (prevValue) =>
                new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1),
        )
    }

    const getNextMonth = () => {
        setSelectedDate(
            (prevValue) =>
                new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1),
        )
    }

    const getPrevYear = () => {
        setSelectedDate(
            (prevValue) =>
                new Date(prevValue.getFullYear() - 1, prevValue.getMonth(), 1),
        )
    }

    const getNextYear = () => {
        setSelectedDate(
            (prevValue) =>
                new Date(prevValue.getFullYear() + 1, prevValue.getMonth(), 1),
        )
    }

    return {
        daysShortArr,
        monthNamesArr,
        todayFormatted,
        calendarRows,
        selectedDate,
        currentMonthLastDate,
        getPrevMonth,
        getNextMonth,
        getPrevYear,
        getNextYear
    }
}

export default CalendarView
