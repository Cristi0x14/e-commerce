package com.example.restapi.dao;
import com.example.restapi.entity.Product;
import com.example.restapi.entity.ProductVariation;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.List;

public class ProductSpecification implements Specification<Product> {

    private List<String> brands;
    private List<String> categories;
    private List<String> genders;

    public ProductSpecification(List<String> brands, List<String> categories, List<String> genders) {
        this.brands = brands;
        this.categories = categories;
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
        if (genders != null && !genders.isEmpty()) {
            predicate = criteriaBuilder.and(predicate, root.get("gender").in(genders));
        }
        return predicate;
    }
}
