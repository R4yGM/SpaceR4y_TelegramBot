const Telegraf = require('telegraf');
var request = require("request");
const token = '859440755:AAEemAmeZJV1JozxOTPKAfdIvnMz0D7nGs4';
const bot = new Telegraf(token);

const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

console.log('\x1b[36m%s\x1b[0m', 'bot started');


bot.start((message) => {
  console.log('started:', message.from.id + " Name : "+message.from.first_name);
  message.reply('Hi! '+ message.from.first_name);
  message.reply('type /help for commands!');

})
bot.command('/help',  ({reply}) =>{
  return reply('type for a rover list /rover')
});
bot.command('/rover', ({ reply }) => {
  return reply('Select one rover! ', Markup
  .keyboard([
    ['US Curiosity', 'US Spitfire'], 
    ['US Sojourner', 'US Opportunity'], 
    ['URSS Mars 2', 'URSS Mars 3'] 
    //['/rovers'] 
  ])
  .oneTime()
  .resize()
  .extra()
)

});
bot.hears('US Curiosity',({ reply }) =>{
  return reply('Select what you want ', Markup
  .keyboard([
    ['CUR_Info', 'CUR_Random Image'], 
    ['CUR_Satellite Landing site', 'CUR_Last photos'], 
    ['/rover'] 
    
  ])
  .oneTime()
  .resize()
  .extra()
)

});
var cur_status;
var total_photos
var max_sol
bot.hears('CUR_Info',(message)=>{
  var cur_info_Text = "Curiosity is a car-sized rover designed to explore the crater Gale on Mars as part of NASA's Mars Science Laboratory mission (MSL). Curiosity was launched from Cape Canaveral on November 26, 2011, at 15:02 UTC and landed on Aeolis Palus inside Gale on Mars on August 6, 2012, 05:17 UTC. The Bradbury Landing site was less than 2.4 km (1.5 mi) from the center of the rover's touchdown target after a 560 million km (350 million mi) journey.The rover's goals include an investigation of the Martian climate and geology; assessment of whether the selected field site inside Gale has ever offered environmental conditions favorable for microbial life, including investigation of the role of water; and planetary habitability studies in preparation for human exploration."
   
    request('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      
      

      cur_status = body.photos[0].rover.status;
      total_photos = body.photos[0].rover.total_photos;
      max_sol = body.photos[0].rover.max_sol;
      message.reply(cur_info_Text)
      message.replyWithPhoto('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg/435px-Curiosity_Self-Portrait_at_%27Big_Sky%27_Drilling_Site.jpg')
     
       message.reply("landing date : 2012-08-06"+"\n launching date 2011-11-26"+"\n total photos "+total_photos+"\n sol "+max_sol+"\n stauts:"+cur_status , Markup
       .keyboard([
         ['CUR_Info', 'CUR_Random Image'], 
         ['CUR_Satellite Landing site','CUR_Last photos'],
         ['/rover'] 
         
       ])
       .oneTime()
       .resize()
       .extra()
     ); 
    

  });

  
  
 
});
var cameratype;

bot.hears('CUR_Random Image', (message) =>{
  var numbe = Math.floor(Math.random() * 2394); 
  request('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+numbe+'&api_key=dJdDhMXmcmIjVzLLeZWJb3svuXACbJcnDSL5dOxQ', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
 
  var length = body.photos.length;
   
  var numb = Math.floor(Math.random() * length);   

  console.log(numb);

  console.log(length);
  var messages = [];
  var date = body.photos[numb].earth_date;
  messages.push("Rover Curiosity");
  messages.push(body.photos[numb].camera.full_name);
  messages.push(body.photos[numb].img_src);
  messages.push("date "+date);    
  messages.push("Sol : "+ numbe);       

  //console.log(body.photos[0].camera.full_name);
  //console.log(body.photos[0].img_src);
  //console.log ("date "+body.photos[0].img_src.earth_date);
    message.reply(messages.join("\n"), Markup
    .keyboard([
      ['CUR_Info', 'CUR_Random Image'], 
      ['CUR_Satellite Landing site','CUR_Last photos'],
      ['/rover'] 
      
    ])
    .oneTime()
    .resize()
    .extra()
  );
    
});
})
const CUR_SAT_Site = 'https://api.nasa.gov/mars-wmts/catalog/mars_pahrump_patch_8k_256m.html';
bot.hears('CUR_Satellite Landing site', (message) =>{
message.reply('https://api.nasa.gov/mars-wmts/catalog/mars_pahrump_patch_8k_256m.html' ,Markup
  .keyboard([
    ['CUR_Info', 'CUR_Random Image'], 
    ['CUR_Satellite Landing site','CUR_Last photos'], 
    ['/rover']
    
  ])
  .oneTime()
  .resize()
  .extra()
);
  
});  //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2019-5-4&api_key=DEMO_KEY
bot.hears('CUR_Last photos', (message) =>{
  var str = new Date();
  var d_sliced = str.toString().slice(0,10);

  var dd = String(str.getDate()).padStart(2, '0');
  var day = str.getDay();
  var month = str.getMonth() + 1;
  var year = str.getFullYear();
console.log(month)

  var day_load = day;
  request('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='+year+'-'+month+'-'+day_load+'&api_key=DEMO_KEY', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    
  var link = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='+year+'-'+month+'-'+day_load+'&api_key=DEMO_KEY';

  console.log(link);
    console.log(d_sliced);
    console.log(str);
    
    var length = body.photos.length; 
    var numb = Math.floor(Math.random() * length);   
  console.log(numb);
  console.log(length);
  console.log(final_url);
  var messages = [];
  var date = body.photos[numb].earth_date;
  
  messages.push("Rover Curiosity");
  messages.push(body.photos[numb].camera.full_name);
  messages.push(body.photos[numb].img_src);
  messages.push("date "+date);
  //messages.push("Sol : "+ numbe);           
    message.reply(messages.join("\n"),Markup
    .keyboard([
    ['CUR_Info', 'CUR_Random Image'], 
    ['CUR_Satellite Landing site','CUR_Last photos'], 
    ['/rover']     
    ])
    .oneTime()
    .resize()
    .extra()
  );   
  
});




});
 //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+number+'&camera=fhaz&api_key=dJdDhMXmcmIjVzLLeZWJb3svuXACbJcnDSL5dOxQ
bot.hears('CUR_Cameras' ,(message) =>{
  var number = Math.floor(Math.random() * 2394);
  //const chat_id;
  //bot.Telegraf.getChat(chat_id);
  //console.log(c)
  message.reply('Select a camera for random photos' ,Markup
    .keyboard([
      ['CUR_FHAZ', 'CUR_NAVCAM','CUR_MAST'], 
      ['CUR_CHENCAM','CUR_MAHLI','CUR_MARDI'], 
      ['CUR_RHAZ']
      
    ])
    .oneTime()
    .resize()
    .extra()
  );
    
  });
  bot.hears('CUR_FHAZ',(message) =>{
     custom_image_for_cam(cam = 'fhaz', message)
  })
  bot.hears('CUR_NAVCAM',(message) =>{
    custom_image_for_cam(cam = 'navcam', message)
 })
 bot.hears('CUR_MAST',(message) =>{
  custom_image_for_cam(cam = 'mast', message)
})
bot.hears('CUR_CHENCAM',(message) =>{
  custom_image_for_cam(cam = 'chencam', message)
})
bot.hears('CUR_MAHLI',(message) =>{
  custom_image_for_cam(cam = 'mahli', message)
})
bot.hears('CUR_MARDI',(message) =>{
  custom_image_for_cam(cam = 'mardi', message)
})
bot.hears('CUR_RHAZ',(message) =>{
  custom_image_for_cam(cam = 'rhaz', message)
})
const ur1 = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=';
const ur2 = '&camera=';
const ur3 = '&api_key=dJdDhMXmcmIjVzLLeZWJb3svuXACbJcnDSL5dOxQ';

var final_url;
var randomsol;
  function custom_image_for_cam(cam, message)
  {
    /*if(cam == 'navcam')
    {
    if(randomsol == 37){randomsol = 1};
    if(randomsol == 38){randomsol = 2};
    if(randomsol == 39){randomsol = 10};
    if(randomsol == 40){randomsol = 12};
    }*/
    


    //1-2-10-12
    var numbe = Math.floor(Math.random() * 2394); 
    if(cam = 'navcam')
    {
      final_url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+numbe+'&camera='+cam+'&api_key=dJdDhMXmcmIjVzLLeZWJb3svuXACbJcnDSL5dOxQ';

    }else if(cam = 'fhaz')
    {
      final_url = ur1+numbe+ur2+cam+ur3;
    }else if (cam = 'mast')
    {
      final_url = ur1+numbe+ur2+cam+ur3;
    }
    //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+numbe+'&camera='+cam+'&api_key=dJdDhMXmcmIjVzLLeZWJb3svuXACbJcnDSL5dOxQ
  request(final_url, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  var length = body.photos.length; 
  if(length == 0)
  {
    custom_image_for_cam(cam, message);
  }
 //console.log(res);
  
  var numb = Math.floor(Math.random() * length);   
  console.log(numb);
  console.log(length);
  console.log(final_url);
  var messages = [];
  var date = body.photos[numb].earth_date;
  
  messages.push("Rover Curiosity");
  messages.push(body.photos[numb].camera.full_name);
  messages.push(body.photos[numb].img_src);
  messages.push("date "+date);
  messages.push("Sol : "+ numbe);           
    message.reply(messages.join("\n"),Markup
    .keyboard([
      ['CUR_FHAZ', 'CUR_NAVCAM','CUR_MAST'], 
      ['CUR_CHENCAM','CUR_MAHLI','CUR_MARDI'], 
      ['CUR_RHAZ'],['US Curiosity']     
    ])
    .oneTime()
    .resize()
    .extra()
  );   
  
});



}



bot.startPolling();






