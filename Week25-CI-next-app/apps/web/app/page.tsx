import styles from "./page.module.css";
import { prisma } from "@repo/db/prisma";

export default async function Home() {
	const user = await prisma.user.findFirst();

	return (
		<div>
			<p> hello there,</p>
			<div className="mt-3">
				<p>email: {user?.email}</p>
				<p> password: {user?.password}</p>
			</div>
		</div>
	);
}
