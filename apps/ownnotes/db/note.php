<?php
namespace OCA\OwnNotes\Db;

use JsonSerializable;

use OCP\AppFramework\Db\Entity;

class Note extends Entity implements JsonSerializable {

    protected $object_id;
    protected $client_name;
    protected $facture;
    protected $userId;

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'object_id' => $this->object_id,
            'client_name' => $this->client_name,
            'facture' => $this->facture
        ];
    }
}