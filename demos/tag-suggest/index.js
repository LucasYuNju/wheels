$(() => {
    const tags = window;
    const $input = $("#search");
    $input.on("input", () => {
        const input = $input.val();
        const output = [];
        if(input) {
            for(let tag in tags) {
                if(tag.indexOf(input) === 0 && output.length < 10) {
                    const postfix = tag.slice(input.length);
                    output.push(`<li>
                        <a href="javascript:void(0)">${input}<span>${postfix}</span></a>
                        </li>`);
                }
            }
        }
        $("#suggest-list").html(output.join(""));
    });
});

// http://www.cnblogs.com/rubylouvre/archive/2012/02/16/2353615.html
