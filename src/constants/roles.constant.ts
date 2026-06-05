export enum RoleName {
  ADMIN = "admin",
  MANAGER = "manager",
  STAFF = "staff"
}

export enum Permission {
  USERS_READ = "users:read",
  USERS_CREATE = "users:create",
  USERS_UPDATE = "users:update",
  USERS_DELETE = "users:delete",

  CATEGORIES_READ = "categories:read",
  CATEGORIES_CREATE = "categories:create",
  CATEGORIES_UPDATE = "categories:update",
  CATEGORIES_DELETE = "categories:delete",

  PRODUCTS_READ = "products:read",
  PRODUCTS_CREATE = "products:create",
  PRODUCTS_UPDATE = "products:update",
  PRODUCTS_DELETE = "products:delete",

  SUPPLIERS_READ = "suppliers:read",
  SUPPLIERS_CREATE = "suppliers:create",
  SUPPLIERS_UPDATE = "suppliers:update",
  SUPPLIERS_DELETE = "suppliers:delete",

  ORDERS_READ = "orders:read",
  ORDERS_CREATE = "orders:create",
  ORDERS_UPDATE = "orders:update",
  ORDERS_DELETE = "orders:delete",

  PAYMENTS_READ = "payments:read",
  PAYMENTS_CREATE = "payments:create",
  PAYMENTS_UPDATE = "payments:update",
  PAYMENTS_DELETE = "payments:delete",

  INVENTORY_READ = "inventory:read",
  INVENTORY_CREATE = "inventory:create",
  INVENTORY_UPDATE = "inventory:update",
  INVENTORY_DELETE = "inventory:delete",
}

export const rolePermissions: Record<RoleName, Permission[]> = {
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
