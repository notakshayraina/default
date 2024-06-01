global class batchmagic implements Database.Batchable<sObject>, schedulable {
	
// collect the batches of records or objects to be passed to execute
global Database.QueryLocator start(Database.BatchableContext bc) {

   String query='select id,Description,Subject from case where Status =\'Closed\'';
return Database.getQueryLocator(query); // can fetch up-to 50 Million records
}
// deleting the received chunk of records
global void execute(Database.BatchableContext bc, List<Case> caselist) {
    List<PII__c> data= new List<PII__c>();
    List<Case> cases=new List<Case>();
    for(Case c:caselist){
       
        PII__c p= new PII__c();   
        p.Name=c.Description;
        p.Type__c='Description';
        p.relatedcase__c=c.id;
        data.add(p);


        PII__c p2= new PII__c();   
        p2.Name=c.Subject;
        p2.Type__c='Subject';
        p2.relatedcase__c=c.id;
        data.add(p2);


        c.Description='It is masked now';
        c.Subject='It is masked now';
cases.add(c);
 
 
    }
    insert data;
    update cases;
         
 }
// Send an email to the User after your batch completes 
global void finish(Database.BatchableContext BC) 
{  

} 

global void execute(SchedulableContext ctx){
    
    batchmagic batch = new batchmagic();
    Database.executebatch(batch, 200);
  }
}

