export class JobListModel{
    constructor(
        public company_id:string,
        public job_title:string,
        public job_description:string,
        public job_post_date:Date,
        public job_last_date:Date,
        public job_skills:string[],
        public job_isactive:Boolean,
      ) {}
}

export interface UserModel {
    _id:string,
    email:string,
    token:string,
    password:string,
    usertype:string,
    username:string
}

export interface JobModel {
    jobheading:string,
    experience:string,
    keyskills:string,
    salarypackage:string,
    jobDescription:string,
}

export interface UserDetailModel {
    mobile:string,
    profile_skills:string[],
    high_qualification:string,
    resume:string,
    c_name:string,
    c_email:string,
    designation:string,
    c_location:string,
    c_address:string,
    c_description:string
}
