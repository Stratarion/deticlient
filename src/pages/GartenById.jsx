import React from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "layouts";

function GartenByI({id}) {
	const params = useParams();
	return (
		<MainLayout>
			GartenById {params.id}
		</MainLayout>
	)
}

export default GartenByI;