export var RoleName;
(function (RoleName) {
    RoleName["ADMIN"] = "admin";
    RoleName["MANAGER"] = "manager";
    RoleName["STAFF"] = "staff";
})(RoleName || (RoleName = {}));
export var Permission;
(function (Permission) {
    Permission["USERS_READ"] = "users:read";
    Permission["USERS_CREATE"] = "users:create";
    Permission["USERS_UPDATE"] = "users:update";
    Permission["USERS_DELETE"] = "users:delete";
    Permission["CATEGORIES_READ"] = "categories:read";
    Permission["CATEGORIES_CREATE"] = "categories:create";
    Permission["CATEGORIES_UPDATE"] = "categories:update";
    Permission["CATEGORIES_DELETE"] = "categories:delete";
    Permission["PRODUCTS_READ"] = "products:read";
    Permission["PRODUCTS_CREATE"] = "products:create";
    Permission["PRODUCTS_UPDATE"] = "products:update";
    Permission["PRODUCTS_DELETE"] = "products:delete";
    Permission["SUPPLIERS_READ"] = "suppliers:read";
    Permission["SUPPLIERS_CREATE"] = "suppliers:create";
    Permission["SUPPLIERS_UPDATE"] = "suppliers:update";
    Permission["SUPPLIERS_DELETE"] = "suppliers:delete";
    Permission["ORDERS_READ"] = "orders:read";
    Permission["ORDERS_CREATE"] = "orders:create";
    Permission["ORDERS_UPDATE"] = "orders:update";
    Permission["ORDERS_DELETE"] = "orders:delete";
    Permission["PAYMENTS_READ"] = "payments:read";
    Permission["PAYMENTS_CREATE"] = "payments:create";
    Permission["PAYMENTS_UPDATE"] = "payments:update";
    Permission["PAYMENTS_DELETE"] = "payments:delete";
    Permission["INVENTORY_READ"] = "inventory:read";
    Permission["INVENTORY_CREATE"] = "inventory:create";
    Permission["INVENTORY_UPDATE"] = "inventory:update";
    Permission["INVENTORY_DELETE"] = "inventory:delete";
})(Permission || (Permission = {}));
export const rolePermissions = {
    [RoleName.ADMIN]: Object.values(Permission),
    // [RoleName.ADMIN]: [
    //   Permission.INVENTORY_READ,
    //   Permission.INVENTORY_CREATE,
    //   Permission.INVENTORY_UPDATE,
    //   Permission.INVENTORY_DELETE,
    // ],
    [RoleName.MANAGER]: [
        Permission.CATEGORIES_READ,
        Permission.CATEGORIES_CREATE,
        Permission.CATEGORIES_UPDATE,
        Permission.CATEGORIES_DELETE,
        Permission.PRODUCTS_READ,
        Permission.PRODUCTS_CREATE,
        Permission.PRODUCTS_UPDATE,
        Permission.PRODUCTS_DELETE,
        Permission.SUPPLIERS_READ,
        Permission.SUPPLIERS_CREATE,
        Permission.SUPPLIERS_UPDATE,
        Permission.SUPPLIERS_DELETE,
        Permission.ORDERS_READ,
        Permission.ORDERS_CREATE,
        Permission.ORDERS_UPDATE,
        Permission.ORDERS_DELETE,
        Permission.PAYMENTS_READ,
        Permission.PAYMENTS_CREATE,
        Permission.PAYMENTS_UPDATE
    ],
    [RoleName.STAFF]: [
        Permission.CATEGORIES_READ,
        Permission.PRODUCTS_READ,
        Permission.SUPPLIERS_READ,
        Permission.ORDERS_READ,
        Permission.ORDERS_CREATE,
        Permission.ORDERS_UPDATE,
        Permission.PAYMENTS_READ,
        Permission.PAYMENTS_CREATE,
        Permission.PAYMENTS_UPDATE
    ]
};
