package dto;

import java.io.Serializable;

public class DatabaseData implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long id;
    private String value;
    private String category;
    private String extraValue;
    private String type;
    
    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getExtraValue() { return extraValue; }
    public void setExtraValue(String extraValue) { this.extraValue = extraValue; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}    
