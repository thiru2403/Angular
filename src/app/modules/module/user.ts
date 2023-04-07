
export  interface User {
      
  
       firstName:string;
       lastName: string;
       email: string;
       mobile: string;
       weigth:number;
       height:number;
       bmi: number;
       bmiResults: string;
       gender: string;
       requireTrainer : string;
       package: string;
       important: string[];
       haveGymBefore: string;
       enquiryDate : string;
       Address: address[];
       id: number;
       


 }

     interface address{
        
        streetname: string;
        floorname: string;
     }
  
