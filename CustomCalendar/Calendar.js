import React from 'react'
import CalendarView from './CalendarView'
import './Calendar.css'

const Calendar = ({
    eventsData,
    minimumDate,
    maximumDate,
    prevMonthArrow,
    nextMonthArrow,
    prevYearArrow,
    nextYearArrow,
    // disablePrevMonthArrow,
    // disableNextMonthArrow,
    // disablePrevYearArrow,
    // disableNextYearArrow,
}) => {
    const {
        calendarRows,
        selectedDate,
        todayFormatted,
        daysShortArr,
        monthNamesArr,
        currentMonthLastDate,
        getNextMonth,
        getPrevMonth,
        getPrevYear,
        getNextYear,
    } = CalendarView()
    // console.log(disablePrevMonthArrow, disableNextMonthArrow)

    const changeDateFormat = (date) => {
        let formattedDate = ''
        let dateArr
        dateArr = date.split('-')
        let day = dateArr[1] * 1
        let month = dateArr[0].length > 2 ? dateArr[2] * 1 : dateArr[0] * 1
        let year = dateArr[2].length > 2 ? dateArr[2] * 1 : dateArr[0] * 1
        formattedDate = `${month}-${day}-${year}`
        return formattedDate
    }

    // const minimumDate = changeDateFormat(minDate)
    // const maximumDate = changeDateFormat(maxDate)
    // console.log(currentMonthLastDate)

    const disableMonthArrow = (label) => {
        let minMonth = new Date(minimumDate)
        let maxMonth = new Date(maximumDate)
        if (label === 'left') {
            return (
                currentMonthLastDate.getMonth() + 1 ===
                    minMonth.getMonth() + 1 && true
            )
        } else if (label === 'right') {
            return (
                currentMonthLastDate.getMonth() + 1 ===
                    maxMonth.getMonth() + 1 && true
            )
        } else {
            return false
        }
    }

    const disableYearArrow = (label) => {
        let minMonth = new Date(minimumDate)
        let maxMonth = new Date(maximumDate)
        if (label === 'left') {
            return (
                currentMonthLastDate.getFullYear() === minMonth.getFullYear() &&
                true
            )
        } else if (label === 'right') {
            return (
                currentMonthLastDate.getFullYear() === maxMonth.getFullYear() &&
                true
            )
        } else {
            return false
        }
    }

    const minAndMax = (col) => {
        // console.log(col)
        let minDate = new Date(minimumDate && minimumDate)
        let maxDate = new Date(maximumDate && maximumDate)

        let date1 = new Date(col.date)
        if ((minDate && minDate) || (maxDate && maxDate)) {
            if (date1 < minDate) {
                return `${col.classes}disabled`
            } else if (date1 > maxDate) {
                return `${col.classes}disabled`
            } else {
                return `${col.classes}`
            }
        } else {
            return `${col.classes}`
        }
    }

    const getClassName = (label, col, cur) => {
        if (label && label === 'today') {
            return `${col.classes}today event ${cur.class && cur.class}`
        } else if (
            (minimumDate && minimumDate) ||
            (maximumDate && maximumDate)
        ) {
            let minDate = new Date(minimumDate && minimumDate)
            let maxDate = new Date(maximumDate && maximumDate)

            let date1 = new Date(col.date)
            if (date1 < minDate) {
                return `${col.classes}disabled`
            } else if (date1 > maxDate) {
                return `${col.classes}disabled`
            } else {
                return `${col.classes}event ${cur.class && cur.class}`
            }
        } else {
            return `${col.classes}event ${cur.class && cur.class}`
        }
    }

    const manageEvents = (label, col) => {
        return (
            eventsData &&
            eventsData.map(
                (cur) =>
                    // cur.date === col.date && (
                    changeDateFormat(cur.date) === col.date && (
                        <div
                            key={col.date}
                            className={getClassName(label, col, cur)}
                            onClick={() => handleClick(col.date)}
                        >
                            <div id='day'>
                                {col.value}
                                {cur.event && (
                                    <div className='content'>{cur.event}</div>
                                )}
                            </div>
                        </div>
                    ),
            )
        )
    }

    const getDateValues = (col) => {
        if (col.date === todayFormatted) {
            if (
                eventsData &&
                eventsData.find(
                    // (cur) => cur.date === col.date,
                    (cur) => changeDateFormat(cur.date) === col.date,
                )
            ) {
                return manageEvents('today', col)
                // eventsData &&
                // eventsData.map(
                //     (cur) =>
                //         cur.date === col.date && (
                //             <td
                //                 key={col.date}
                //                 className={`${col.classes}today event ${
                //                     cur.class && cur.class
                //                 }`}
                //                 onClick={() => handleClick(col.date)}
                //             >
                //                 <div id='day'>
                //                     {col.value}
                //                     {cur.event && (
                //                         <div className='content'>
                //                             {cur.event}
                //                         </div>
                //                     )}
                //                 </div>
                //             </td>
                //         ),
                // )
            } else {
                return (
                    <div
                        key={col.date}
                        className={`${col.classes}today`}
                        onClick={() => handleClick(col.date)}
                    >
                        <div id='day'>{col.value}</div>
                    </div>
                )
            }
        } else if (
            eventsData &&
            // eventsData.find((cur) => cur.date === col.date)
            eventsData.find((cur) => changeDateFormat(cur.date) === col.date)
        ) {
            return manageEvents('', col)
            // eventsData &&
            // eventsData.map(
            //     (cur) =>
            //         cur.date === col.date && (
            //             <td
            //                 key={col.date}
            //                 className={`${col.classes}event ${
            //                     cur.class && cur.class
            //                 }`}
            //                 onClick={() => handleClick(col.date)}
            //             >
            //                 <div id='day'>
            //                     {col.value}
            //                     {cur.event && (
            //                         <div className='content'>
            //                             {cur.event}
            //                         </div>
            //                     )}
            //                 </div>
            //             </td>
            //         ),
            // )
        } else {
            return (
                <div
                    key={col.date}
                    className={minAndMax(col)}
                    // className={col.classes}
                    onClick={() => handleClick(col.date)}
                >
                    <div id='day'>{col.value}</div>
                </div>
            )
        }
        // col.date === todayFormatted ? (
        //   <td
        //     key={col.date}
        //     className={`${col.classes} today`}
        //     onClick={() => handleClick(col.date)}
        //   >
        //     {col.value}
        //   </td>
        // ) : (
        //   <td
        //     key={col.date}
        //     className={col.classes}
        //     onClick={() => handleClick(col.date)}
        //   >
        //     {col.value}
        //   </td>
        // );
    }

    const handleClick = (date) => {
        let old = new Date(date)
        let current = new Date()

        let oldDate
        oldDate = old.getMonth() + '-' + old.getDate() + '-' + old.getFullYear()
        oldDate = new Date(oldDate)
        oldDate.setHours(current.getHours())
        oldDate.setMinutes(current.getMinutes())
        oldDate.setSeconds(current.getSeconds())
        console.log(oldDate)
    }

    return (
        <div className='calendar-container'>
            <div className='year-view'>
                <button
                    className='arrow-btn year-arrow'
                    onClick={getPrevYear}
                    disabled={disableYearArrow('left')}
                >
                    {prevYearArrow && prevYearArrow ? prevYearArrow : '<<'}
                </button>
                <button
                    className='arrow-btn month-arrow'
                    onClick={getPrevMonth}
                    disabled={disableMonthArrow('left')}
                >
                    {prevMonthArrow && prevMonthArrow ? prevMonthArrow : '<'}
                </button>
                {/* Selected Month:{' '} */}
                <div className='year-label'>
                    {monthNamesArr[selectedDate.getMonth()]}{' '}
                    {selectedDate.getFullYear()}
                </div>
                <button
                    className='arrow-btn month-arrow'
                    onClick={getNextMonth}
                    disabled={disableMonthArrow('right')}
                >
                    {nextMonthArrow && nextMonthArrow ? nextMonthArrow : '>'}
                    {/* Next */}
                </button>
                <button
                    className='arrow-btn year-arrow'
                    onClick={getNextYear}
                    disabled={disableYearArrow('right')}
                >
                    {nextYearArrow && nextYearArrow ? nextYearArrow : '>>'}
                </button>
            </div>
            <div className='calendar-section'>
                {/* <thead> */}
                <div className='week-days'>
                    {daysShortArr.map((day) => (
                        <div className='days-label' key={day}>
                            {day}
                        </div>
                    ))}
                </div>
                {/* </thead> */}
                {/* <tbody> */}
                <div className='calendar-days-section'>
                    {Object.values(calendarRows).map((cols, index) => {
                        return (
                            <div key={index} className='cal-days'>
                                {/* <div key={cols[0].date} className='cal-days'> */}
                                {cols.map((col) => getDateValues(col))}
                            </div>
                        )
                    })}
                </div>
                {/* </tbody> */}
            </div>
        </div>
    )
}

export default Calendar
