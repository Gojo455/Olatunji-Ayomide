import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";

// ── 1. STATE ──────────────────────────────────────────────
// display  → what the user sees on screen
// firstNum → the number saved before an operator is pressed
// operator → which operation the user chose (+, -, ×, ÷)

export default function App() {
  const [display,  setDisplay]  = useState("0");
  const [firstNum, setFirstNum] = useState(null);
  const [operator, setOperator] = useState(null);



  // Called when a number button is pressed
  const pressNumber = (num) => {
    if (display === "0") {
      setDisplay(num);          // replace the leading zero
    } else {
      setDisplay(display + num); // append the digit
    }
  };

  // Called when +, -, ×, or ÷ is pressed
  const pressOperator = (op) => {
    setFirstNum(parseFloat(display)); // save what's on screen
    setOperator(op);                  // save which operation
    setDisplay("0");                  // clear screen for second number
  };

  // Called when = is pressed
  const pressEquals = () => {
    if (firstNum === null || operator === null) return; // nothing to calculate

    const secondNum = parseFloat(display);
    let result;

    if (operator === "+") result = firstNum + secondNum;
    if (operator === "-") result = firstNum - secondNum;
    if (operator === "×") result = firstNum * secondNum;
    if (operator === "÷") result = secondNum !== 0 ? firstNum / secondNum : "Error";

    setDisplay(String(result));
    setFirstNum(null);  // reset for next calculation
    setOperator(null);
  };

  // Called when C is pressed — resets everything
  const pressClear = () => {
    setDisplay("0");
    setFirstNum(null);
    setOperator(null);
  };


  return (
    <SafeAreaView style={styles.container}>

      {/* Screen */}
      <Text style={styles.display}>{display}</Text>

      {/* Buttons */}
      <View style={styles.row}>
        <Btn label="C" onPress={pressClear} color="#555" />
        <Btn label="÷" onPress={() => pressOperator("÷")} color="#e94560" />
        <Btn label="×" onPress={() => pressOperator("×")} color="#e94560" />
      </View>
      <View style={styles.row}>
        <Btn label="7" onPress={() => pressNumber("7")} />
        <Btn label="8" onPress={() => pressNumber("8")} />
        <Btn label="9" onPress={() => pressNumber("9")} />
        <Btn label="-" onPress={() => pressOperator("-")} color="#e94560" />
      </View>
      <View style={styles.row}>
        <Btn label="4" onPress={() => pressNumber("4")} />
        <Btn label="5" onPress={() => pressNumber("5")} />
        <Btn label="6" onPress={() => pressNumber("6")} />
        <Btn label="+" onPress={() => pressOperator("+")} color="#e94560" />
      </View>
      <View style={styles.row}>
        <Btn label="1" onPress={() => pressNumber("1")} />
        <Btn label="2" onPress={() => pressNumber("2")} />
        <Btn label="3" onPress={() => pressNumber("3")} />
        <Btn label="=" onPress={pressEquals} color="#e94560" />
      </View>
      <View style={styles.row}>
        <Btn label="0" onPress={() => pressNumber("0")} wide />
        <Btn label="." onPress={() => { if (!display.includes(".")) setDisplay(display + "."); }} />
      </View>

    </SafeAreaView>
  );
}


function Btn({ label, onPress, color = "#16213e", wide = false }) {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: color }, wide && styles.wide]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    justifyContent: "flex-end",
    padding: 16,
    gap: 10,
  },
  display: {
    color: "#fff",
    fontSize: 56,
    textAlign: "right",
    padding: 16,
    fontWeight: "200",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    flex: 1,
    height: 75,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  wide: {
    flex: 2,
  },
  btnText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "500",
  },
});