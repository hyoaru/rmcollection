import React from "react";

// App imports
import setOrderGroupStatusAdmin from "@services/admin/tables/setOrderGroupStatusAdmin";
import OrderStatusActionItemToReceive from "@components/admin/tables/orders/OrderStatusActionItemToReceive";
import OrderStatusActionItem from "@components/shared/OrderStatusActionItem";
import { DropdownMenuContent, DropdownMenuLabel } from "@components/ui/dropdown-menu";
import { BASE_ADMIN_ROLES as baseAdminRoles } from "@constants/admin/base";
import { OrderType } from "@constants/shared/types";
import { Tables } from "@constants/base/database-types";

type OrderStatusActionsDropdownContentProps = {
  order: OrderType;
  authenticatedUser: Tables<"users">;
  queryKeys: any[][];
};

export default function OrderStatusActionsDropdownContent({
  order,
  authenticatedUser,
  queryKeys,
}: OrderStatusActionsDropdownContentProps) {
  return (
    <DropdownMenuContent align="end" side="top">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {baseAdminRoles.includes(authenticatedUser.role) && ["to_ship"].includes(order.order_status?.label!) && (
        <OrderStatusActionItemToReceive order={order} queryKeys={queryKeys} />
      )}
      {baseAdminRoles.includes(authenticatedUser.role) &&
        ["pending", "to_ship"].includes(order.order_status?.label!) && (
          <OrderStatusActionItem
            label={"Order: cancel"}
            action={() => setOrderGroupStatusAdmin({ order: order, status: "cancelled_by_management" })}
            queryKeys={queryKeys}
            isDestructive={true}
          />
        )}
    </DropdownMenuContent>
  );
}
