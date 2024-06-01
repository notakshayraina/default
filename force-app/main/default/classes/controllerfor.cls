public with sharing class controllerfor {
    @AuraEnabled(cacheble=true)
    public static List<sObject>  searchin(String searchkey, String objectapiname) {
     List<sObject> sobjectlist= new List<sObject>();
        if(String.isBlank(searchkey)){
            return sobjectlist;
        }
        else{
              String key= '%'+searchkey+'%';
              String query='Select id,name from'+objectapiname+'where name like'+key+ 'order by name limit 9';
              sobjectlist=Database.query(query,AccessLevel.USER_MODE);
              return sobjectlist;
        }

    }
}