import handlebars from 'handlebars';
import 'jquery';

export  default {
    get(name){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `../views/${name}-template.handlebars`,
                success: html => {
                    let template = handlebars.compile(html);

                    resolve(template);
                }
            })
        })
    }
}