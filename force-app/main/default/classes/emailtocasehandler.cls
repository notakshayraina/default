global without sharing class emailtocasehandler implements Messaging.InboundEmailHandler{
    
    global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email,Messaging.InboundEnvelope env)
   {
 String emailaddress= env.fromAddress;
 String newCaseId='';
 String contactemails='';
 String senderemail=env.fromAddress;

    try{
        if(existingcase(senderemail,email.plainTextBody,email.subject)){

        }

        else{
        Case newcase=new Case();
    newcase.senderemail__c=senderemail;
    newcase.Status='InProgress';
    newcase.Description=email.plainTextBody;
    newcase.Origin='Email';
    

    newCaseId=newcase.CaseNumber;
    

 Matcher m= Pattern.compile('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+').matcher(email.plainTextBody);
 while(m.find()){
     contactemails=m.group();
 }

 newcase.Subject=email.subject+''+contactemails;
 insert newcase;
        }
 
    }


    catch(Exception e){
        
Messaging.SingleEmailMessage mymail = new Messaging.SingleEmailMessage();
String[] toaddresses = new String[] {emailaddress}; 


mymail.setToAddresses(toAddresses);
mymail.setSubject('An email from Salesforce');
mymail.setPlainTextBody('This email has been sent through Apex'+e);

Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mymail });
    }

//---------------------------------------------------------------
finally{
    
Messaging.SingleEmailMessage mymail = new Messaging.SingleEmailMessage();
String[] toaddresses = new String[] {emailaddress}; 


mymail.setToAddresses(toAddresses);
mymail.setSubject('Thank you for the email');
mymail.setPlainTextBody('This email has been sent through Apex, we have created Case:'+newCaseId+'for this, and it would be worked upon');

Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mymail });

}

//-------------------------------------------------------





    return null;

   }

   global Boolean existingcase(String sender, String contactbody, String Subjects){
 String contactemails='';
    List<Case> ca=[Select id,senderemail__c,Status,Description,Subject from Case where senderemail__c=:sender ];
    if(ca.size()<=0){
        return false;
    }
    else{
       Case cas=ca[0];
        cas.senderemail__c=sender;
        cas.Status='InProgress';
        cas.Description=contactbody;
        Matcher m= Pattern.compile('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+').matcher(contactbody);
 while(m.find()){
     contactemails=m.group();
 }

 cas.Subject=Subjects+''+contactemails;
 update cas;
 return true;

    }

   }

}