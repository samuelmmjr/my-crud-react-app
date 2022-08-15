import React, { useEffect, useState } from 'react';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
import ClayToolbar from '@clayui/toolbar';
import AddPostForm from './addPostForm';
import { getAll, remove, update } from './request';
import ClayModal, { useModal } from '@clayui/modal';


function App() {
	const [blogPost, setBlogPost] = useState([]);
	const [headlineEdit, setHeadlineEdit] = useState(undefined);
	const [articleBodyEdit, setArticleBodyEdit] = useState(undefined);
	const [id, setId] = useState(undefined);
	const [updateModalOpen, setUpdateModalOpen] = useState(false)
	const [isUpdate, setIsUpdate] = useState(false)

	const { observer } = useModal({
		onClose: () => setUpdateModalOpen(false)
	})


	useEffect(() => {
		getAll().then(res => {
			setBlogPost(res.items);
			setIsUpdate(false)
		})

	}, [isUpdate]);


	function removerBlogpost(event) {
		const id = event.target.value
		remove(id)
		setBlogPost(blogPost.filter((post) => post.id != id))
	}

	function updateBlogPost(event) {
		const id = event.target.value
		const setBlogPostEdit = blogPost.find((post) => post.id == id)
		setId(id)
		setHeadlineEdit(setBlogPostEdit.headline)
		setArticleBodyEdit(setBlogPostEdit.articleBody)
		setUpdateModalOpen(true)

	}

	function confirmUpdate() {
		update(id, headlineEdit, articleBodyEdit)
		setIsUpdate(true)
		setUpdateModalOpen(false)

	}

	return (
		<div className="row">
			<div className="col-4">
				<h1>blogPosts:</h1>
				<ClayForm.Group>

					<ClayTable>

						<ClayTable.Head>

							<ClayTable.Row>
								<ClayTable.Cell expanded headingTitle>{"headline"}</ClayTable.Cell>
								<ClayTable.Cell headingTitle>{"articleBody"}</ClayTable.Cell>
							</ClayTable.Row>

						</ClayTable.Head>

						<ClayTable.Body>
							{blogPost.map(post => (

								<ClayTable.Row key={post.id}>

									<ClayTable.Cell>{post.headline}</ClayTable.Cell>
									<ClayTable.Cell>{post.articleBody}</ClayTable.Cell>
									<ClayTable.Cell>
										<ClayToolbar.Section>

											<div className='row'>
												<div className='col-5'>

													<ClayToolbar.Item>
														<ClayButton displayType="primary" value={post.id} onClick={removerBlogpost}>{"x"}</ClayButton>
													</ClayToolbar.Item>

												</div>
												<div className='col-5'>
													<ClayToolbar.Item>
														<ClayButton displayType="secondary" value={post.id} onClick={updateBlogPost}>{"^"}</ClayButton>
													</ClayToolbar.Item>
												</div>
											</div>
										</ClayToolbar.Section>
									</ClayTable.Cell>
								</ClayTable.Row>
							))}

						</ClayTable.Body>

					</ClayTable>


				</ClayForm.Group>
			</div >

			<div className="col-8">
				<AddPostForm onSave={(newBlogPost) => setBlogPost([...blogPost, newBlogPost])} />
			</div>


			{updateModalOpen && (
				<ClayModal observer={observer} >
					<ClayModal.Header>Edit Post Form</ClayModal.Header>
					<ClayForm.Group>
						<label htmlFor="headline">headline</label>

						<ClayInput
							id="headline"
							onChange={event => setHeadlineEdit(event.target.value)}
							type="text"
							value={headlineEdit}
						/>
					</ClayForm.Group>
					<ClayForm.Group>
						<label htmlFor="articleBody">Article Body</label>

						<ClayInput
							id="articleBody"
							onChange={event => setArticleBodyEdit(event.target.value)}
							type="text"
							value={articleBodyEdit}
						/>
					</ClayForm.Group>
					<ClayButton className="btn btn-primary" onClick={confirmUpdate}>Update</ClayButton>

				</ClayModal>
			)}
		</div >
	);
}

export default App;