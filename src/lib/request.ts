const ACCESS_TOKEN =
  process.env.SANDBOX_TOKEN ||
  't.5kYJtyirZ6SWFmWg45CHCKWXS-rVcx2nH2fgbTuQJREuVrQXpxlmCE1J2_pOUNJJ3pf_aI9gq1bu5n5f4lq60Q';

type ResponseMeta = {
  code: number;
  url: string;
  method: string;
};

export interface SuccessResponse extends ResponseMeta {
  payload: object;
}

export interface FailResponse extends ResponseMeta {
  data: {
    message: '';
  };
}

export type FormData = {
  file: File;
  name: string;
  meta?: {
    [index: string]: string;
  };
};

export type RequestProps = {
  method?: string;
  url: string;
  body?: object;
  file?: FormData;
};

function attachFormData({ file, name, meta }: FormData) {
  const data = new FormData();
  data.append(name, file);
  meta && Object.keys(meta).map((value) => data.append(value, meta[value]));
  return data;
}

export const request = async ({
  url,
  method = 'get',
  body,
  file,
}: RequestProps): Promise<any> => {
  const fetchUrl = url;

  const headers = {
    ...(!file && { 'Content-Type': 'application/json' }),
    Accept: 'application/json',
    Authorization: `Bearer t.UKBHwCk4vy1a-iJLnJDZ8wvaK4E82065f1XQtCVDBnGoSER9enMrBBW2votO8WPAiwKJ4U9rkm8REezSxcA4cg`,
  };

  const fetchOptions = {
    headers,
    method,
    ...(file && { body: attachFormData(file) }),
  };

  const response = await fetch(fetchUrl, fetchOptions);

  const meta = {
    code: response.status,
    url,
    method,
  };

  let result: any = {};

  if (response.headers.get('Content-Type')?.includes('application/json')) {
    result = await response.json();
  }

  const resBody: FailResponse | SuccessResponse = {
    payload: result.payload,
    ...meta,
  };

  if (response.ok) return resBody;

  throw resBody;
};
