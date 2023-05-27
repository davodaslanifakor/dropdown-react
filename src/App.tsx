
import Dropdown from "./components/dropdown/dropdown";
import {useState} from "react";
const options = [
    "Hello 👋",
    "I'm Aline 👽",
    "I live in 🌌",
    "I drive a 🚀"
]
const App =  () => {
    const [selected,onSelect] = useState<string>(options[0])
    return (
        <div className={'DropDownApp'}>
            <Dropdown items={options} value={selected} onSelect={onSelect} />
        </div>
    );
};

export default App;
