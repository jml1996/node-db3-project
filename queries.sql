-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT
    p.Id, p.ProductName, c.CategoryName
FROM Product p
LEFT JOIN Category c
    ON p.CategoryId = c.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT
    o.id, s.CompanyName
FROM 'Order' o
LEFT JOIN Shipper s
    ON o.ShipVia = s.Id
WHERE OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT
    p.ProductName, od.Quantity
FROM OrderDetail od
JOIN Product p
    ON od.ProductId = p.Id
WHERE od.OrderId = 10251
ORDER BY ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT
    o.Id as 'OrderId', c.CompanyName, e.LastName as 'Employee LastName'
FROM 'Order' o
JOIN Customer c
    ON o.CustomerId = c.Id
JOIN Employee e
    ON o.EmployeeId = e.Id;

-- ^Kind of think those should be LEFT JOINs, given the "for every order" requirement. But that would yield 16818 records.
