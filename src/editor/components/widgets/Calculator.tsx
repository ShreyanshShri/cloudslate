import { useState } from "react";

const Calculator = () => {
	const [val, setVal] = useState<string>("0");

	const appendVal = (n: string) => {
		if (val === "0") return setVal(n);
		setVal((prev) => prev + n);
	};

	return (
		<div id="calculator">
			<div id="calc-numbers-wrapper">
				<input
					type="text"
					className="calc-numbers"
					value={val}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const v = e.target.value;
						if (
							!Number.isNaN(Number(v.split("")[v.length - 1])) ||
							v === "." ||
							v === "+" ||
							v === "-" ||
							v === "*" ||
							v === "/"
						) {
							setVal(v);
						}
					}}
				/>
			</div>

			<div className="calculator-buttons">
				<button
					className="calc-btn is-clear span-2 orange operator"
					onClick={() => setVal("0")}
				>
					C
				</button>
				<button
					className="calc-btn orange operator"
					onClick={() => val !== "" && setVal("")}
				>
					&larr;
				</button>
				<button
					className="calc-btn orange operator"
					onClick={() => setVal(eval(val))}
				>
					=
				</button>
				<button className="calc-btn" onClick={() => appendVal("7")}>
					7
				</button>
				<button className="calc-btn" onClick={() => appendVal("8")}>
					8
				</button>
				<button className="calc-btn" onClick={() => appendVal("9")}>
					9
				</button>
				<button
					className="calc-btn orange operator"
					onClick={() => appendVal("+")}
				>
					+
				</button>
				<button className="calc-btn" onClick={() => appendVal("4")}>
					4
				</button>
				<button className="calc-btn" onClick={() => appendVal("5")}>
					5
				</button>
				<button className="calc-btn" onClick={() => appendVal("6")}>
					6
				</button>
				<button className="calc-btn orange" onClick={() => appendVal("-")}>
					-
				</button>
				<button className="calc-btn" onClick={() => appendVal("1")}>
					1
				</button>
				<button className="calc-btn" onClick={() => appendVal("2")}>
					2
				</button>
				<button className="calc-btn" onClick={() => appendVal("3")}>
					3
				</button>
				<button
					className="calc-btn orange operator"
					onClick={() => appendVal("*")}
				>
					x
				</button>
				<button className="calc-btn span-2" onClick={() => appendVal("0")}>
					0
				</button>
				<button className="calc-btn" onClick={() => appendVal(".")}>
					.
				</button>
				<button
					className="calc-btn orange operator"
					onClick={() => appendVal("/")}
				>
					&divide;
				</button>
			</div>
		</div>
	);
};

export default Calculator;
