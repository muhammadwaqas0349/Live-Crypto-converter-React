
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const arr = ['usd', 'eur', 'gbp', 'cny', 'jpy'];
  const [currency, setCurrency] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [convertedCurr, setConvertedCurr] = useState(0);
  const [isUp, setIsUp] = useState(true);
  const [diff, setDiff] = useState(0);
 
  const handleChange = (e) => {
    const val = e.target.value; 
    setCurrency(val);
  }; 
  const handleCurrencyType = (e) => {
    const type = e.target.value; 
    console.log(type);
    setSelectedCurrency(type); 
  }
  const fetchCurrencyInfo = async () => {
    try {
      const url =
        `https://api.frontendeval.com/fake/crypto/${selectedCurrency}`
      const result = await fetch(url);
      const data = await result.json();
      const val = data.value; 
      const showCurr = val * currency;
      setConvertedCurr(showCurr.toFixed(2));

      const prevVal = window.sessionStorage.getItem("prevVal"); 

      const diff = (showCurr.toFixed(2) - prevVal); 
      console.log(diff);
      setDiff(diff.toFixed(2));
      diff<0 ? setIsUp(false) : setIsUp(true); 

      window.sessionStorage.setItem("prevVal", showCurr.toFixed(2));
    } catch (err) {
      console.error('Error : ', err);
    }
  }

  useEffect(() => {
    fetchCurrencyInfo();
  }, [currency])

  return (
    <div className="App">
      <h1>Crypto Convert App</h1>
      <div className="wrapper">
        <input type="number" onChange={handleChange} value={currency} />

        <select
          onChange={handleCurrencyType}
          value={selectedCurrency}
          name="currency"
        >
          {arr.map((curr) => {
            return (
              <option value={curr} key={curr}>
                {curr.toLocaleUpperCase()}
              </option>
            );
          })}
        </select>
      </div>

      <div className="curr-info">
        <div>{convertedCurr}</div>
        <div>WUC</div>
        <div className={true ? "green" : "red"}>
          <span>{isUp ? "⬆" : "⬇"}</span>
          <span>{diff}</span>
        </div>
      </div>
    </div>
  );
}

export default App
