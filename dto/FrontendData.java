package dto;

import java.io.Serializable;

public class FrontendData implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String id;
    private String value;
    private String relatedKey;
    private String additionalInfo;
    
    // getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
    
    public String getRelatedKey() { return relatedKey; }
    public void setRelatedKey(String relatedKey) { this.relatedKey = relatedKey; }
    
    public String getAdditionalInfo() { return additionalInfo; }
    public void setAdditionalInfo(String additionalInfo) { this.additionalInfo = additionalInfo; }
}    

