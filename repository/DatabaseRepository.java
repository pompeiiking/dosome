package repository;

import dto.DatabaseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DatabaseRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DatabaseRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public DatabaseData fetchData(String relatedKey) {
        String sql = "SELECT * FROM table_name WHERE related_key = ?";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            DatabaseData data = new DatabaseData();
            data.setId(rs.getLong("id"));
            data.setValue(rs.getString("value"));
            data.setCategory(rs.getString("category"));
            return data;
        }, relatedKey);
    }

    public DatabaseData fetchAdditionalData(String relatedKey) {
        String sql = "SELECT * FROM additional_table WHERE related_key = ?";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            DatabaseData data = new DatabaseData();
            data.setId(rs.getLong("id"));
            data.setExtraValue(rs.getString("extra_value"));
            data.setType(rs.getString("type"));
            return data;
        }, relatedKey);
    }
}    

