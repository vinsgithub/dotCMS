package com.dotcms.cmis;

import org.apache.chemistry.opencmis.commons.data.ObjectInFolderList;
import org.apache.chemistry.opencmis.commons.data.ObjectList;
import org.apache.chemistry.opencmis.commons.server.CallContext;
import org.apache.chemistry.opencmis.commons.server.ObjectInfoHandler;
import org.junit.AfterClass;
import org.junit.BeforeClass;

import com.dotcms.TestBase;
import com.dotmarketing.business.APILocator;
import com.dotmarketing.exception.DotDataException;
import com.dotmarketing.exception.DotSecurityException;


public class CMISBaseTest extends TestBase {


	protected static CallContext callContext;
	protected static ObjectInfoHandler objectInfos;
	protected static String repoId;
	protected static String rootPath;

	
    @BeforeClass
    public static void prepare () throws DotSecurityException, DotDataException {

    }
    
    protected static String getdefaultHostId(){
        try { // FIXME: this is a stub
            return APILocator.getHostAPI().findDefaultHost(
    	        APILocator.getUserAPI().getSystemUser(), false).getIdentifier();
        }
        catch(Exception ex) {
            return null;
        }
    }
    
    protected static ObjectInFolderList getRootFolderChildren(){
    	return null;
    }

    @AfterClass
    public static void afterClass () throws Exception {
        // TODO cleanup tasks if any
    }

    protected static String createFile ( String fileName , String folderId ) throws Exception {
    	return null;

    }
    
    protected static String createFolder( String folderName ) throws Exception {
    	return null;
    }
    
    protected static ObjectList doQuery(String query){
    	return null;
    }
}
