export default function report (expenses,mm){    
    expenses.forEach(item => {
        let date = new Date(item.date)
        if(item.type == 'Food & Drink'&& date.getMonth() ==mm){
            foodCounterPrice += item.price
            initData = {
            ...initData,
            foods : foodCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            foods: foodCounterPrice         
            })       
        }
        else if(item.type == 'Entertainment'&& date.getMonth() ==mm){
            entertainmentCounterPrice += item.price
            initData = {
            ...initData,
            entertainment : entertainmentCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            entertainment: entertainmentCounterPrice         
            })       
        }
        else if(item.type == 'Clothes'&& date.getMonth() ==mm){
            clothesCounterPrice += item.price
            initData = {
            ...initData,
            clothes : clothesCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            clothes: clothesCounterPrice         
            })       
        }
        else if(item.type == 'Transport'&& date.getMonth() ==mm){
            transportCounterPrice += item.price
            initData = {
            ...initData,
            transport : transportCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            transport: transportCounterPrice         
            })       
        }
        else if(item.type == 'Electronic'&& date.getMonth() ==mm){
            electronicCounterPrice += item.price
            initData = {
            ...initData,
            electronic : electronicCounterPrice
            }
            data = month[mm].concat({
            ...initData,
            electronic: electronicCounterPrice         
            })       
        }
    })
}
