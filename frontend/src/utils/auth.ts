type Role = keyof typeof ROLES;
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

export const hasPermission = (user: { role: Role }, permission: Permission) => {
	if (!user) {
		return false;
	}

	return (ROLES[user.role] as readonly Permission[]).includes(permission);
};
