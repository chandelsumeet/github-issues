export const calculateCreatedTime = (createdOnTimeStamp:string | number | Date)=>{
    const currentTimeInMilliSeconds = new Date().getTime();
    const createdOnMilliSeconds = new Date(createdOnTimeStamp).getTime();
    const differenceInMilliSeconds = Math.abs(currentTimeInMilliSeconds - createdOnMilliSeconds);
    const days = Math.floor(differenceInMilliSeconds/(1000 * 60 * 60 * 24));
    const hours =Math.floor(differenceInMilliSeconds%(1000 * 60 * 60 * 24)/  (1000 * 60 * 60 )); 

    if(days>=20 && days <=31)
    {
        return `last month`
    }
    else if(days>= 2 && days<20)
    {
        return `${days} days ago` 
    }
    else if(days == 1)
    {
        return `yesterday`
    }
    else if(days <1)
    {
        return `${hours} hours ago`
    }
    else
    {
        return `${days} days ago`
    }

   

}