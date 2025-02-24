import type { State } from '@vincjo/datatables/remote';
import { PUBLIC_LINODE_URL } from '$env/static/public';

export const reload = async (state: State, fetch:typeof window.fetch, province:any, mgt_body:any) => {
	const response = await fetch(`${PUBLIC_LINODE_URL}/datalist/?${getParams(state,province,mgt_body)}`);	
	let {rows, ...totalRow} = await response.json();

	
	if(totalRow && rows) {
		state.setTotalRows(totalRow.count)
		return rows;
	}
};

const getParams = (state: State,province: any, mgt_body:any) => {
	const { pageNumber, rowsPerPage, sort, filters, search} = state;

	let params = `_page=${pageNumber}`;

	if (rowsPerPage) {
		params += `&_limit=${rowsPerPage}`;
	}
	if (sort) {
		params += `&_sort=${sort.orderBy}&_order=${sort.direction}`;
	}

	if (filters) {
		params += filters.map(({ filterBy, value }) => `&${filterBy}=${value}`).join();
	}
	if(province.length != 0) {
		if(province.length == 2) {
			let provinceSplit = province[1].split("/",2);
			if(provinceSplit.length == 1){
				provinceSplit = province[0].split("/",2);
			}
			params+= `&province=${provinceSplit[0]}&municipality=${provinceSplit[1]}`;
		} else {
			params += `&province=${province[0]}`;
		}
	}

	if(mgt_body) {
		params += `&mgt_body=${mgt_body}`;
	}
	if (search) {
		params += `&q=${search}`;
	}


	console.log("I am params",params);
	console.log("I am state",state)
	return params;
};
