import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../modules/module/user';
import { ApiService } from '../services/service.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent implements OnInit {
  public packages:string[] = ["Monthly","Quarterly","Yearly"]; 
  public genders:string[] =["Male","Female"];
  public importantList:string[] = ["Toxic Fat reduction","Energy and Endurance","Building Lean Muscle","sugar Craving Body","Healthier Digestive system","Fitness"];
  public traineeOpt:string[] = ['Yes', 'No']

  
  public registerForm!: FormGroup;
  public UserIdToUpdate!: number;
  public isUpdateActive: boolean = false; 
  

  constructor(private router : Router, private fb:FormBuilder,private activateRoute:ActivatedRoute, private api:ApiService, private toastService:NgToastService){}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName:['',[Validators.required, Validators.pattern('[a-zA-Z]{2,10}')]],
      lastName:['', [Validators.required, Validators.pattern('[a-zA-Z]{2,10}')]],
      email:['',  [Validators.required, Validators.email]],
      mobile:['', [Validators.required, Validators.pattern("(0/91)?[7-9][0-9]{9}")]],
      weigth:['', [Validators.required, Validators.minLength(2)] ],
      height:['', [Validators.required]],
      bmi:['', [Validators.required,Validators.pattern('[a-zA-Z]{2,10}')]],
      bmiResults:['',[Validators.required,Validators.pattern('[a-zA-Z]{2,10}')]],
      gender:['',Validators.required],
      requireTrainer:['',Validators.required],
      package:['',Validators.required],
      important:['',Validators.required],
      haveGymBefore:['',Validators.required],
      enquiryDate:['',Validators.required],
      Address: new FormArray([this.createAddress()]),
      id:['']
      
    
    })
     this.activateRoute.params.subscribe(val=>{
      this.UserIdToUpdate = val['id'];
      try
      {
        this.api.getRegistrationUserId(this.UserIdToUpdate).subscribe(res=>{
          if(res){
            this.isUpdateActive = true;
            this.fillFormToUpdate(res);
          }
         
        })
      }
      catch(err){
        alert("Given ID not found");
          this.router.navigate(['/register']);
      }
     })
    
  };
    

  createAddress(){
    return this.fb.group({
      streetname:['',[Validators.required,Validators.pattern('[a-zA-Z]{2,10}')]],
      floorname:['', [Validators.required,Validators.pattern('[a-zA-Z]{2,10}')]]
    })
  }
  get getformArrayControls(){
    return (this.registerForm.get('Address') as FormArray).controls
    
  }
  saveAll(){
   this.api.postRegistration(this.registerForm.value).subscribe(res=>{
      this.toastService.success({detail:"Success", summary:"Enquiry Add", duration:3000});
      this.registerForm.reset();
    })


  }

  update(){
    this.api.updateRegistration(this.registerForm.value,this.UserIdToUpdate).subscribe(res=>{
      this.toastService.success({detail:"Success", summary:"Enquiry Update", duration:3000});
     this.router.navigate(['list'])
    })
  }

  inValid(controlName : string):boolean | undefined{
  return this.registerForm.get(controlName)?.touched && this.registerForm.get(controlName)?.errors!==null;
  }


 

  calculationBmi(heightValue:number){
    const weigth = this.registerForm.value.height;
    const height =  heightValue;
    const Bmi = weigth/(height * height);
    this.registerForm.controls['bmi'].patchValue(Bmi);
    switch(true){
      case Bmi < 18.5:
        this.registerForm.controls['bmiResults'].patchValue("Underweight");
        break;
     case (Bmi >= 18.5 && Bmi< 25):
        this.registerForm.controls['bmiResults'].patchValue("Normal");
        break;
     case (Bmi>=25 && Bmi< 30):
        this.registerForm.controls['bmiResults'].patchValue("OverWeight");
        break;
        
     default:
      this.registerForm.controls['bmiResults'].patchValue("Obese");
      break;   

    }

  }

 fillFormToUpdate(user:User){
  this.registerForm.setValue({
    firstName:user.firstName,
       lastName: user.lastName,
       email: user.email,
       mobile: user.mobile,
       weigth:user.weigth,
       height:user.height,
       bmi: user.bmi,
       bmiResults: user.bmiResults,
       gender: user.gender,
       requireTrainer : user.requireTrainer,
       package: user.package,
       important: user.important,
       haveGymBefore: user.haveGymBefore,
       enquiryDate :user.enquiryDate,
       Address:user.Address,
       id:user.id
  })
 }

 BackToList(){
  this.router.navigate(['list']);
 }

}
