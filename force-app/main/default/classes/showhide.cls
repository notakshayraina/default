public  class showhide {
    @AuraEnabled
    public static void show(ID rec) {
        system.debug(rec);
    List<PII__c> pills=[Select id,Name,Type__c,relatedcase__c from PII__c where relatedcase__c=:rec];
    Case c=[Select id from case where id=:rec];
    for(PII__C p:pills){

        if(p.Type__c=='Subject'){
           c.Subject=p.Name;

        }

        else{ c.Description=p.Name;

        }

    }

    update c;


    }
    
    public static void hide(Id rec){

        Case c=[Select id from case where id=:rec];
        c.Subject='It is masked now';
        c.Description='It is masked now';
        update c;

    }
}