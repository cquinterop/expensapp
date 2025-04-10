export type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
	admin: [
		"view:expenses",
		"create:expenses",
		"update:expenses",
		"delete:expenses",
		"approve:expenses",
		"reject:expenses",
		"view:dashboard",
	],
	employee: ["view:expenses", "create:expenses"],
} as const;

export const hasPermission = (role: Role, permission: Permission) => {
	if (!role) {
		return false;
	}

	return (ROLES[role] as readonly Permission[]).includes(permission);
};
