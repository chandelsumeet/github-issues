export type IGithubData= {
        url: string,
        id: string | number,
        title: string,
        user:IUser,
        labels: Array<ILabel>,
        comments: string | number,
        created_at: Date,
        updated_at:Date,    
        number: string | number
}

export type IUser = {
        login: string,
        id: string | number,
        avatar_url:string
}

export type ILabel = {
        name: string,
        color: string,  
        id:string | number      
}