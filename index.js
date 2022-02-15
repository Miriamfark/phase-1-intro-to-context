function createEmployeeRecord(employeeArray) {
const employeeObject = {}
employeeObject.firstName = employeeArray[0]
employeeObject.familyName = employeeArray[1]
employeeObject.title = employeeArray[2]
employeeObject.payPerHour = employeeArray[3]
employeeObject.timeInEvents = []
employeeObject.timeOutEvents = []
return employeeObject
}

function createEmployeeRecords(arrayOfArrays) {
  const arrayOfEmployeeRecords = arrayOfArrays.map(createEmployeeRecord)
  return arrayOfEmployeeRecords
}

function createTimeInEvent(employeeObject, timeStamp) {
   const time = timeStamp.split(" ")[1]
    employeeObject.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(time),
            date: timeStamp.split(" ")[0] 
        }
        )
    return employeeObject
}

function createTimeOutEvent(employeeObject, timeStamp) {
    const time = timeStamp.split(" ")[1]
    employeeObject.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(time),
            date: timeStamp.split(" ")[0] 
        }
    )
    return employeeObject 
}

function hoursWorkedOnDate(employeeObject, date) {
   const outEvent = employeeObject.timeOutEvents.find((event)=> {
   return event.date === date
   })
   const inEvent = employeeObject.timeInEvents.find((event)=> {
   return event.date === date
   })

  return (outEvent.hour - inEvent.hour)/100
}


function wagesEarnedOnDate(employeeObject, date) {
    return hoursWorkedOnDate(employeeObject, date) * employeeObject.payPerHour
}

function allWagesFor(employeeObject) {
    const allDates = employeeObject.timeInEvents.map((timeObj)=>timeObj.date) 
    const wages = allDates.reduce((accumulator, date)=>{
      return wagesEarnedOnDate(employeeObject, date)+accumulator
  }, 0)
  return wages
}

function calculatePayroll(arrayOfAllEmployees) {
    const payRoll = arrayOfAllEmployees.map(employee => allWagesFor(employee))
   return payRoll.reduce((a,b) => a+b)
}

