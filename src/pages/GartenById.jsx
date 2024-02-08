import React from "react";
import { useParams } from "react-router-dom";

function GartenByI({id}) {
	const params = useParams();
	return (
		<div>
			GartenById {params.id}
		</div>
	)
}

export default GartenByI;