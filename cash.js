function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let cidSum = 0; // Sum in register
  let changeArr = [];
  
  cid = cid.reverse();

  // Const because its not gonna change and shouldnt
  const currency = [["ONE HUNDRED", 100], ["TWENTY", 20], 
    ["TEN", 10], ["FIVE", 5],["ONE", 1],["QUARTER", 0.25],
    ["DIME", 0.1], ["NICKEL", 0.05], ["PENNY", 0.01]];

  // Calculate amount of money in the register
  for (let i = 0; i < cid.length; i++)
  {
    cidSum += cid[i][1];
  }
  cidSum = parseFloat(cidSum.toFixed(2)); // Fix decimal point
  


  if (change > cidSum) // If not enough money in cash register
  {
    return { status: "INSUFFICIENT_FUNDS", change: changeArr }
  }
  else if ( change == cidSum) // If perfect amount
  {
    return { status: "CLOSED", change: cid.reverse()}
  }
  else
  {
    for (let i=0; i < cid.length; i++)
    {
      let temp = [cid[i][0], 0]; // To hold a sum for each unit
      while ( change >= currency[i][1] && cid[i][1] > 0)
      {
        temp[1] += currency[i][1]; // Add amount 
        cid[i][1] -= currency[i][1]; // Remove one coin/bill from money array
        change -= currency[i][1]; // Minus amount from total change
        change = parseFloat(change.toFixed(2)); // Fix floating point
      }
      if (temp[1] > 0)
      {
        changeArr.push(temp);
      }
    }
  }
  console.log(change);
  if (change > 0) // If change is still not equal 0
  {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } 
  return { status: "OPEN", change: changeArr }
}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])