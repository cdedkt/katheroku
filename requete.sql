select * from brands;  --547
select * from products;  --16904
select * from category_products; --42923
select * from categories; --1002

drop table category_asup;
drop table category_products_asup;

create table category_asup as
select category_id, count(1) nb from category_products 
group by category_id 
having count(1)>=20
order by nb desc;

create table category_products_asup as
select category_id, product_id from category_products cp
where exists (select 1 from category_asup ca where ca.category_id=cp.category_id);

delete from category_products cp
where exists (select 1 from category_products_asup cpa where cpa.product_id=cp.product_id and cpa.category_id=cp.category_id);

delete from categories c
where exists (select 1 from category_asup ca where ca.category_id=c.id);

delete from products p where 
not exists (select 1 from category_products cp where cp.product_id=p.id);

--select * from category_products where product_id = '2b0df0b5-65c1-4f54-a054-e874afd5695f';