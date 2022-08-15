import React, { useCallback, useState } from 'react';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayButton from '@clayui/button';


import { create } from './request';

function AddPostForm({ onSave }) {


	const [headline, setHeadline] = useState('');
	const [articleBody, setArticleBody] = useState('');

	const onButtonSubmit = useCallback(() => {
		create(
			headline,
			articleBody
		).then((response) => {
			setHeadline('');
			setArticleBody('');
			onSave(response)
		}).catch((e) => console.log(e));
	},
		[
			create,
			headline,
			articleBody
		]);

	return (
		<div>
			<h1>Add Post Form</h1>

			<ClayForm.Group>
				<label htmlFor="headline">headline</label>

				<ClayInput
					id="headline"
					onChange={event => setHeadline(event.target.value)}
					placeholder="Titulo"
					type="text"
					value={headline}
				/>
			</ClayForm.Group>
			<ClayForm.Group>
				<label htmlFor="articleBody">Article Body</label>

				<ClayInput
					id="articleBody"
					onChange={event => setArticleBody(event.target.value)}
					placeholder="Bloggs"
					type="text"
					value={articleBody}
				/>
			</ClayForm.Group>
			<ClayButton className="btn btn-primary" data-target="#clayModalFullScreenSmDown" onClick={() => onButtonSubmit()}>Create post</ClayButton>
		</div>
	);
}

export default AddPostForm;