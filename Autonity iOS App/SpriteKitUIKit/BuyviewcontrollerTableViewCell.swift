//
//  BuyviewcontrollerTableViewCell.swift
//  SpriteKitUIKit
//
//  Created by Abhay Sidhwani on 18/12/17.
//  Copyright © 2017 Rickey Hrabowskie. All rights reserved.
//

import UIKit

class BuyviewcontrollerTableViewCell: UITableViewCell {
   
    @IBOutlet weak var mylabel: UILabel!
    
    @IBOutlet weak var uniqueid: UILabel!
    var m:String!
    
    
    
    @IBAction func purchase(_ sender: UIButton) {
        
        let url = URL(string: "http://192.168.0.10:7200/api/v1/transaction/mine?sender=\(uniqueid.text!)&reciever=\("abhay")&carID=\(mylabel.text!)")
        let request = NSMutableURLRequest(url: url!)
        request.httpMethod = "POST"
        let session = URLSession.shared
        let task = session.dataTask(with: request as URLRequest, completionHandler: {
            (
            data, response, error) in
            
            guard ((data) != nil), let _:URLResponse = response, error == nil else {
                print("error")
                return
            }
            
           
        })
        
        task.resume()
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
