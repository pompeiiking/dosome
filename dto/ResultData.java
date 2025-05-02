package dto;

import java.io.Serializable;

public class ResultData implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String status;
    private String intermediateValue;
    private String finalValue;
    
    // getters and setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getIntermediateValue() { return intermediateValue; }
    public void setIntermediateValue(String intermediateValue) { this.intermediateValue = intermediateValue; }
    
    public String getFinalValue() { return finalValue; }
    public void setFinalValue(String finalValue) { this.finalValue = finalValue; }
}    

