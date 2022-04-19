module.exports = {
    name: "math",
    description: "performs simple math functions",
    execute(message, args) {
        let op = args[0]
        let num1 = args[1]
        let num2 = args[2]
        let parseNum1 = parseInt(num1)
        let parseNum2 = parseInt(num2)
        let ans
        if (!op) {
            message.reply("You must enter the type of action according to the formula: " +
                "\`!math <operation> <number1> <number2>\`")
        }
        else {
            if (op === "add") {
                if (!args[1] || !args[2]) {
                    message.reply("You must enter the components of the sum according to the formula: " +
                        "\`!math add <number1> <number2>\`")
                }
                else {
                    ans = parseNum1 + parseNum2
                    message.channel.send("Result: " + ans)
                }
            }
            else if (op === "sub") {
                if (!args[1] || !args[2]) {
                    message.reply("You must enter the components of the difference according to the formula: " +
                        "\`!math sub <number1> <number2>\`")
                }
                else {
                    ans = parseNum1 - parseNum2
                    message.channel.send("Result: " + ans)
                }
            }
            else if (op === "mul") {
                if (!args[1] || !args[2]) {
                    message.reply("You must enter the components of the product according to the formula: " +
                        "\`!math mul <number1> <number2>\`")
                }
                else {
                    ans = parseNum1 * parseNum2
                    message.channel.send("Result: " + ans)
                }
            }
            else if (op === "div") {
                if (!args[1] || !args[2]) {
                    message.reply("You must enter the components of the division according to the formula: " +
                        "\`!math <number1> <number2>\`")
                }
                else {
                    if (parseNum2 === 0) {
                        message.reply("You cannot divide by 0 !")
                    }
                    else{
                        ans = (parseNum1 / parseNum2).toFixed(5)
                        message.channel.send("Result: " + ans)
                    }
                }
            }
            else if (op === "mod") {
                if (!args[1] || !args[2]) {
                    message.reply("You must enter the components of the integer division according to the formula: " +
                        "\`!math mod <number1> <number2>\`")
                }
                else {
                    ans = parseNum1 % parseNum2
                    message.channel.send("Result: " + ans)
                }
            }
            else if (op === "pow") {
                if (!args[1] || !args[2]) {
                    message.reply("You need to enter the base and exponent of the exponentiation according to the formula: " +
                        "\`!math pow <number1> <number2>\`")
                }
                else {
                    ans = Math.pow(parseNum1, parseNum2)
                    message.channel.send("Result: " + ans)
                }
            }
            else if (op === "root") {
                if (!args[1]) {
                    message.reply("You need to enter a number for the extraction of a root according to the formula: " +
                        "\`!math root <number1>\`")
                }
                else {
                    ans = Math.pow(parseNum1, 1/2).toFixed(5)
                    message.channel.send("Result: " + ans)
                }
            }
        }
    }
}