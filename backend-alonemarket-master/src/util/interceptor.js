module.exports = {
    mockReq: () =>{
        const req = {}
        const mock = jest.fn();
                        
        req.params = mock.mockReturnValue(req);             
        req.param = mock.mockReturnValue(req); 
        req.body = mock.mockReturnValue(req);
        req.query = mock.mockReturnValue(req);
        return req;
    },

    mockRes: () => {
        const res = {}
        const mock = jest.fn();

        res.send = mock.mockReturnValue(res);
        res.json = mock.mockReturnValue(res);
        res.status = mock.mockReturnValue(res);        
        return res;
    }
}