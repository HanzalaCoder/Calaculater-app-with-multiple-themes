/* toggle feature */
const them1 = document.querySelector(".theme-one")
const them2 = document.querySelector(".theme-two")
const them3 = document.querySelector(".theme-three")
const btns = document.querySelectorAll(".btn")

them1.addEventListener("click",() => {
    document.documentElement.classList.remove("them3","them2")
    removeActive()
    them1.classList.add("active")
    
})
them2.addEventListener("click",() => {
    document.documentElement.classList.remove("them3")
     removeActive()
    them2.classList.add("active")
    document.documentElement.classList.add("them2")

})
them3.addEventListener("click",() => {
    document.documentElement.classList.remove("them2")
    removeActive()
    them3.classList.add("active")
    document.documentElement.classList.add("them3")

})

function removeActive() {
    btns.forEach((btn) => {
        btn.classList.remove("active")
     })
}

/* calculater appp */

const numbers = document.querySelectorAll(".numbers")
const operations = document.querySelectorAll(".symbols")
const equal = document.querySelector(".equal")
const backspace = document.querySelector(".del")
const allclear = document.querySelector(".reset")
const prevOutput = document.querySelector(".prev-input")
const currentOutput = document.querySelector(".current-input")


class Calculater {
    constructor(prev,current) {
        this.currentoutput = current
        this.prevoutput = prev
        this.operation = ""
        this.currentnum = ""
        this.prevnum = ""
        this.deleteALl()
    }

    deleteALl() {
        this.currentnum = ""
        this.prevnum = ""
        this.operation = ""
        this.updateDisplay()
    }
    deletOne() {
        this.currentnum = this.currentnum.toString().slice(0,-1)
    }

    appendNumbers(number) {
        if (number === "." && this.currentnum.includes(".")) return
        this.currentnum = this.currentnum + number.toString()
    }
    appentOperation(operater) {
        if ( this.currentnum === "") return 
        if (this.prevnum !== "") {
            this.calculate()
        } 
        this.operation = operater
        this.prevnum = this.currentnum
        this.currentnum = "" 
    }

    calculate() {
        let answer = ""
        if (this.currentnum && this.prevnum) {
            switch(this.operation){
                case "+":
                answer = parseFloat(this.currentnum) + parseFloat(this.prevnum)
                break
                case "-":
                answer = parseFloat(this.prevnum) - parseFloat(this.currentnum)
                break
                case "x":
                answer = parseFloat(this.currentnum) * parseFloat(this.prevnum)
                break
                case "/":
                answer = parseFloat(this.prevnum) / parseFloat(this.currentnum)
                break
                default:
                return
            }
            this.prevnum = ""
            this.operation = ""
            this.currentnum = answer
        }
    }

  /*   applyCommas(number) {
        const stringNubmer = number.toString()
        const intergernum = parseFloat(stringNubmer.split(".")[0])
        const floatnum = stringNubmer.split(".")[1]
        let intergerdisplay;
        if (isNaN(intergernum)) {
            intergerdisplay = ""
        } else {
            intergerdisplay = intergernum.toLocaleString("en", {
            maximumFractionDigits : 0})

        }
        if (floatnum != null ) {
            return `${intergerdisplay}.${floatnum}`
        } else {
            return intergerdisplay
        }
    } */
    updateDisplay() {
        this.currentoutput.textContent =  this.currentnum
        this.prevoutput.textContent =  this.prevnum +" "+ this.operation
    }
}
const calculater = new Calculater(prevOutput,currentOutput)
prevOutput.textContent

allclear.addEventListener("click",() => {
    calculater.deleteALl()
    calculater.updateDisplay()

})


numbers.forEach((num)=> {
    num.addEventListener("click",() => {
        calculater.appendNumbers(num.innerHTML)
        calculater.updateDisplay()
    })
    

})

operations.forEach((operater) => {
    operater.addEventListener("click",() => {
        calculater.appentOperation(operater.innerHTML)
        calculater.updateDisplay()
    })
})


equal.addEventListener("click",() => {
    calculater.calculate()
    calculater.updateDisplay()
})

backspace.addEventListener("click",() => {
    calculater.deletOne()
    calculater.updateDisplay()

})



