import { useState, useEffect } from "react";
import { IGithubData } from "../types/Github";

const PAGE_NUMBER =1;
const URL=`https://api.github.com/repos/facebook/react/issues`
export const useFetch = ()=>{
    const [data , setData] = useState<Array<IGithubData>>([]);
    const [loading , setLoading] = useState<boolean>(false);
    const [error , setError] = useState<any>("");
    const [page, setPageNumber] = useState(PAGE_NUMBER);

    const fetchData = async()=>{
        setLoading(true);
       try{
        const response = await fetch(`${URL}?page=${page}`);
        const result:IGithubData[] =await response.json();
        setData((prev :Array<IGithubData>)=>[...prev , ...result]);
        setLoading(false)
       }
       catch(error)
       { 
        setError(error)
       }
       
    }

    const onScroll =()=>{
      window.addEventListener("scroll", function()
        {
            if( window.innerHeight + this.document.documentElement.scrollTop + 1 >= this.document.documentElement.scrollHeight)  
            {
                setPageNumber(page + 1);
            }
            console.log("scrolled")
        })
    }

    useEffect(()=>{
        fetchData();
       onScroll();
    },[page])
    return {data,loading,error};
}