import handlebars from 'handlebars';
import 'jquery';

export  default {
    get(name){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `./public/handlebars-templates/${name}-template.handlebars`,
                success: html => {
                    let template = handlebars.compile(html);

                    resolve(template);
                }
            })
        })
    }
}