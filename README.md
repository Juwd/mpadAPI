# mpadAPI
MSI Database API Instructions  
Feel free to check db.mpasupportnetwork.org for the website itself

## Sample URL link 
`https://mpadatabase.mandaragat.org/datalist/?_page=1&_limit=5&_sort=province&_order=asc`


## Gather data (w/o Polygon files):
`https://mpadatabase.mandaragat.org/datalist/?_page=1&_limit=5`  

This is the most basic way to interact with the database, there are a max of **456 rows** that you can access and **2220 rows of data**. Polygon files were excluded for faster retrieval. You'll have the initial longLats and information for each protected area with this syntax.

## The Api Code for retrieval of data table:
`${PUBLIC_LINODE_URL}/datalist/?${getParams(state,province,mgt_body)}`

### Type support for error checking
```typescript
type State = 
{
    pageNumber: number;
    rowsPerPage: number;
    offset: number;
    search: string | undefined;
    sort: Sort<Row> | undefined;
    filters: Filter<Row>[] | undefined;
    setTotalRows: (value: number) => void;
    /**
     * @deprecated use 'sort' instead
     */
    sorted: Sort<Row> | undefined;
}
```
### Get parameters function
```typescript
PUBLIC_LINODE_URL = `https://mpadatabase.mandaragat.org`


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
```

### complete params search   
`https://mpadatabase.mandaragat.org/datalist/?_page={pageNumber}&_limit={rowsPerPage}&_sort={sort.orderBy}&_order={sort.direction}&{filterBy}={value}&province={province}&municipality={municipality}&mgt_body={mgt_body}&q={search}`


## Retrieve ALL Map data (w/ polygons)
`https://mpadatabase.mandaragat.org/mpaMap`

### Retrieve ALL Map data within specified Bounding Box 
`https://mpadatabase.mandaragat.org/mpaMap/mpaMapBounded/bbox?bbox=${encodeURIComponent(bboxParam)}`
### Sample of URL
`https://mpadatabase.mandaragat.org/mpaMapBounded/bbox?bbox=[[114.12597,19.663280],[130.528564,19.663280],[130.528564,12.050065],[114.125976,12.05006],[114.12597,19.663280]]&nipas=1&ecosystem=Mangroves`
Note: Nipas and ecosystem are use to filter the data received but not needed
