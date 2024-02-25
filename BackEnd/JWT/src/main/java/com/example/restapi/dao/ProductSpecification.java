package com.example.restapi.dao;
import com.example.restapi.entity.Product;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

public class ProductSpecification implements Specification<Product> {

    private List<String> brands;
    private List<String> categories;
    private List<String> colors;
    private List<String> sizes;
    private List<String> genders;

    public ProductSpecification(List<String> brands, List<String> categories, List<String> colors, List<String> sizes, List<String> genders) {
        this.brands = brands;
        this.categories = categories;
        this.colors = colors;
        this.sizes = sizes;
        this.genders = genders;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        Predicate predicate = criteriaBuilder.conjunction();

        if (brands != null && !brands.isEmpty()) {
            predicate = criteriaBuilder.and(predicate, root.get("brand").in(brands));
        }
        if (categories != null && !categories.isEmpty()) {
            predicate = criteriaBuilder.and(predicate, root.get("category").in(categories));
        }
        if (colors != null && !colors.isEmpty()) {
            predicate = criteriaBuilder.and(predicate, root.get("color").in(colors));
        }
        if (sizes != null && !sizes.isEmpty()) {
            predicate = criteriaBuilder.and(predicate, root.get("size").in(sizes));
        }
        if (genders != null && !genders.isEmpty()) {
            predicate = criteriaBuilder.and(predicate, root.get("gender").in(genders));
        }

        return predicate;
    }
}
