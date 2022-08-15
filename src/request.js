const siteId = Liferay.ThemeDisplay.getSiteGroupId()

export function getAll() {
	return Liferay.Util.fetch(`/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/`, {
		method: 'GET',
		headers: {
			'Authorization': 'Basic ' + btoa(`test@liferay.com:test`),
			"Content-type": "application/json; charset=utf-8"
		}
	}).then(res => res.json());
}

export function create(headline, articleBody) {
	const data = {
		headline: headline,
		articleBody: articleBody
	}

	return Liferay.Util.fetch(`/o/headless-delivery/v1.0/sites/${siteId}/blog-postings/`, {

		method: 'POST',
		headers: {
			'Authorization': 'Basic ' + btoa(`test@liferay.com:test`),
			"Content-type": "application/json; charset=utf-8"
		},
		body: JSON.stringify(data),

	}).then(res => res.json());
}

export function remove(id) {

	return Liferay.Util.fetch(`/o/headless-delivery/v1.0/blog-postings/${id}`, {

		method: 'DELETE'

	}).then(res => res.json)
		.catch(e => console.log(`${e} Fails Delete `))
}

export function update(id, headline, articleBody) {

	const data = {
		headline,
		articleBody,
	};

	const request = {
		headers: {
			'Authorization': 'Basic ' + btoa('test@liferay.com:learn'),
			"Content-type": "application/json; charset=utf-8"
		},
		method: 'PUT',
		body: JSON.stringify(data)
	};

	return Liferay.Util.fetch(`/o/headless-delivery/v1.0/blog-postings/${id}`,
		request
	).then(res => res.json());
}
